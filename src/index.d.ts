import { ThreeForceGraphGeneric, NodeObject, LinkObject } from 'three-forcegraph';

export interface ConfigOptions {}

type Accessor<In, Out> = Out | string | ((obj: In) => Out);
type ObjAccessor<T, InT = object> = Accessor<InT, T>;

// don't surface these internal props from inner ThreeForceGraph
type ExcludedInnerProps = 'onLoading' | 'onFinishLoading' | 'onUpdate' | 'onFinishUpdate' | 'tickFrame' | 'd3AlphaTarget' | 'resetCountdown';

interface ForceGraphVRGenericInstance<ChainableInstance, N extends NodeObject = NodeObject, L extends LinkObject<N> = LinkObject<N>>
  extends Omit<ThreeForceGraphGeneric<ChainableInstance, N, L>, ExcludedInnerProps> {

  _destructor(): void;

  // Container layout
  width(): number;
  width(width: number): ChainableInstance;
  height(): number;
  height(height: number): ChainableInstance;
  backgroundColor(): string;
  backgroundColor(color: string): ChainableInstance;
  showNavInfo(): boolean;
  showNavInfo(enabled: boolean): ChainableInstance;

  // Labels
  nodeLabel(): ObjAccessor<string, N>;
  nodeLabel(textAccessor: ObjAccessor<string, N>): ChainableInstance;
  nodeDesc(): ObjAccessor<string, N>;
  nodeDesc(textAccessor: ObjAccessor<string, N>): ChainableInstance;
  linkLabel(): ObjAccessor<string, L>;
  linkLabel(textAccessor: ObjAccessor<string, L>): ChainableInstance;
  linkDesc(): ObjAccessor<string, L>;
  linkDesc(textAccessor: ObjAccessor<string, L>): ChainableInstance;

  // Interaction
  onNodeHover(callback: (node: N | null, previousNode: N | null) => void): ChainableInstance;
  onLinkHover(callback: (link: L | null, previousLink: L | null) => void): ChainableInstance;
  onNodeClick(callback: (node: N) => void): ChainableInstance;
  onLinkClick(callback: (link: L) => void): ChainableInstance;
}

export type ForceGraphVRInstance<NodeType extends NodeObject = NodeObject, LinkType extends LinkObject<NodeType> = LinkObject<NodeType>>
    = ForceGraphVRGenericInstance<ForceGraphVRInstance<NodeType, LinkType>, NodeType, LinkType>;

interface IForceGraphVR<NodeType extends NodeObject = NodeObject, LinkType extends LinkObject<NodeType> = LinkObject<NodeType>> {
  new(element: HTMLElement, configOptions?: ConfigOptions): ForceGraphVRInstance<NodeType, LinkType>;
}

declare const ForceGraphVR: IForceGraphVR;

export default ForceGraphVR;
