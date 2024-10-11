import type { ReactNode } from 'react';

const _queryPropEmptyArray: string[] = [];

/**
 * Component Props
 */
export type ComponentProps = {
    /**
     * A boolean prop
     */
    booleanProp: boolean;
  
    /**
     * A number prop
     */
    numberProp: number;
  
    /**
     * A string prop
     */
    stringProp: string;
  
    /**
     * A function prop
     */
    functionProp: () => void;
  
    /**
     * A function prop with parameters
     */
    functionWithParamsProp: (param1: string, param2: number) => void;
  
    /**
     * An object prop
     */
    objectProp: object;
  
    /**
     * An array prop
     */
    arrayProp: string[];
  
    /**
     * An array of objects prop
     */
    arrayOfObjectsProp: { name: string }[];
  
    /**
     * An array of objects prop with multiple keys
     */
    arrayOfObjectsPropMulti: { name: string; active: boolean }[];
  
    /**
     * An object with a specific shape prop
     */
    objectWithShapeProp: { name: string };
  
    /**
     * An object with multiple keys
     */
    objectWithShapePropMulti: { name: string; active: boolean };
  
    /**
     * An object with a specific shape and optional key prop
     */
    objectWithOptionalShapeProp?: { name: string };
  
    /**
     * A union prop
     */
    unionProp: string | number;
  
    /**
     * An intersection prop
     */
    intersectionProp: string & number;
  
    /**
     * A literal prop
     */
    literalProp: 'literal';
  
    /**
     * A literal union prop
     */
    literalUnionProp: 'literal' | 'union';
  
    /**
     * A literal intersection prop
     */
    literalIntersectionProp: 'literal' & 'intersection';
  
    /**
     * A type reference prop
     */
    typeReferenceProp: ReactNode;
  
    /**
     * A type operator prop
     */
    typeOperatorProp: keyof ComponentProps;
  
    /**
     * An indexed access prop
     */
    indexedAccessProp: ComponentProps['stringProp'];
  
    /**
     * A query prop
     */
    queryProp: typeof _queryPropEmptyArray;
  
    /**
     * A predicate prop
     */
    predicateProp: (probe: unknown) => probe is number;
  
    /**
     * A reflection prop
     */
    reflectionProp: { name: string };
  
    /**
     * A reflection function prop
     */
    reflectionFunctionProp: (param: string) => number;
  
    /**
     * A reflection function prop with multiple parameters
     */
    reflectionFunctionWithParamsProp: (param1: string, param2: number) => boolean;
  
    /**
     * A mapped prop
     */
    mappedProp: { [key: string]: string };
  
    /**
     * A template literal prop
     */
    templateLiteralProp: `template ${string}`;
  
    /**
     * An unknown prop
     */
    unknownProp: unknown;
  
    /**
     * A tuple prop
     */
    tupleProp: [string, number];
  
    /**
     * A named tuple member prop
     */
    namedTupleMemberProp: [first: string, second: number];
  };

  export {}