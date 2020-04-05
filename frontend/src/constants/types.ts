type $key = string;

export interface IEntry {
    timestamp: string;

    [ideName: string]: $key;
}
