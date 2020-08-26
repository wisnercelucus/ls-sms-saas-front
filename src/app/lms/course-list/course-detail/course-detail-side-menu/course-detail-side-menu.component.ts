import {Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBirthdayCake, 
  faMapMarker, 
  faThumbsUp, 
  faShareAltSquare, 
  faComment, 
  faHeart,
 faSmile , 
 faUserCircle, 
 faUsers, 
 faHome, 
 faUser,
 faComments
} from '@fortawesome/free-solid-svg-icons';




import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';

/**
 * Node for to-do item
 */
export class WeekItemNode {
  children: WeekItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class WeekItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
const WEEKS_DATA = {
  Millestones: [
    'Week 1',
    'Week 2',
    'Week 3',
    'Week 4',
    'Week 5',
    'Week 6',
    'Week 7',
    'Week 8',
  ]
};

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<WeekItemNode[]>([]);

  get data(): WeekItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(WEEKS_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): WeekItemNode[] {
    return Object.keys(obj).reduce<WeekItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new WeekItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: WeekItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as WeekItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: WeekItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}


@Component({
  selector: 'app-course-detail-side-menu',
  templateUrl: './course-detail-side-menu.component.html',
  styleUrls: ['./course-detail-side-menu.component.css'],
  providers: [ChecklistDatabase]
})
export class CourseDetailSideMenuComponent implements OnInit {
  faBirthdayCake = faBirthdayCake;
  faMapMarker = faMapMarker;
  faThumbsUp = faThumbsUp;
  faShareAltSquare = faShareAltSquare;
  faComment = faComment;
  faHeart = faHeart;
  faSmile = faSmile;
  faUserCircle = faUserCircle;
  faUsers = faUsers;
  faHome = faHome;
  faUser = faUser;
  faComments = faComments;


  constructor(private _database: ChecklistDatabase, private router: Router) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<WeekItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

      _database.dataChange.subscribe(data => {
        this.dataSource.data = data;
      });
    }


  ngOnInit(): void {
  }

  navigateTo(path:string){
    this.router.navigate([path])
  }
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<WeekItemFlatNode, WeekItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<WeekItemNode, WeekItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: WeekItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<WeekItemFlatNode>;

  treeFlattener: MatTreeFlattener<WeekItemNode, WeekItemFlatNode>;

  dataSource: MatTreeFlatDataSource<WeekItemNode, WeekItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<WeekItemFlatNode>(true /* multiple */);



  getLevel = (node: WeekItemFlatNode) => node.level;

  isExpandable = (node: WeekItemFlatNode) => node.expandable;

  getChildren = (node: WeekItemNode): WeekItemNode[] => node.children;

  hasChild = (_: number, _nodeData: WeekItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: WeekItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: WeekItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
        ? existingNode
        : new WeekItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: WeekItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: WeekItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: WeekItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: WeekItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: WeekItemFlatNode): void {
    let parent: WeekItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: WeekItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: WeekItemFlatNode): WeekItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  /*
  addNewItem(node: WeekItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  /*
  saveNode(node: WeekItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }*/
  
}
