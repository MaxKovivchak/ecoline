export interface IOption<T> {
    id: number;
    title: string;
    isSelect: boolean;
    type?: T;
}
