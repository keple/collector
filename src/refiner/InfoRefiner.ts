
export interface InfoRefiner<T,S> {
   refineInfo (source :Array<S>) : Array<T>;
}