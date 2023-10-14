import * as fs from "node:fs/promises"
import { IState } from "types/interfaces";

export class FileSystemApiService {
  constructor() { }


  async readFile(path: string): Promise<IState> {

    return JSON.parse(await fs.readFile(path, 'utf-8'));

  }

  async writeFile(path: string, data: string) {

    await fs.writeFile(path, data);

  }
}
