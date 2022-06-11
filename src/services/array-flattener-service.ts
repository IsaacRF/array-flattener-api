/**
 * Abstraction of Array Flattener Service
 */
export interface ArrayFlattenerService {
    /**
     * Parses an array that can contain other arrays inside, and returns
     * a flat array
     * @param array Nested array
     */
    parseArray(array: any[]): Promise<{ flatArray: any[]; deep: number }>
}