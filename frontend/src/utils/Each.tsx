import { Children } from 'react';
export const EachElement =
    ({ render, of }: { render: Function, of: Array<any> }) =>
        Children.toArray
            (of?.map((item, index) =>
                render(item, index)));