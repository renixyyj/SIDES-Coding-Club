/**
 * HallPass Project
 * 
 * Copyright © 2021 Finer Engineering Inc. All rights reserved.
 * Created Dec 9, 2021
 * 
 * @author CJF
 * 
 */


import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    max: 3,
    idleTimeoutMillis: 60000
});

pool.on('error', (err, client) => {
    console.error("PG Pool Error:", err);
    throw new Error('PG Pool Error');
})
export const db = {
    query: (text: string, params: string[] = []) => {
        return new Promise<pg.QueryResult>((resolve, reject) => {
            pool.query(text, params, (err, res) => {
                if (err)
                    reject(err.message);
                resolve(res);
            })
        })
    }
}

