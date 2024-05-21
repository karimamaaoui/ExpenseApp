import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';

@Injectable()
export class ImportService {
  async parseCSV(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
