/**
 * HallPass Project
 * 
 * Copyright © 2021 Finer Engineering Inc. All rights reserved.
 * Created Dec 8, 2021
 * 
 * @author CJF
 * 
 */

import BaseService from 'basenode';
import { Router, Request, Response } from 'express';
import { db } from '../db/index.js';
import parser from 'body-parser';

export class endpoint extends BaseService {
    constructor(router: Router) {
        super();
        router.use(parser.json());
        router.post('/log', (req, res) => this.api(this.post, req, res));
        router.put('/log/:id', (req, res) => this.api(this.update, req, res));
        router.post('/test', (req, res) => this.api(this.test, req, res));
        router.all('*', (req, res) => res.status(404).json("not found"));
        this.startup();
    }

    async startup() {
        const res = await db.query('INSERT INTO timeline (type) values ($1)', ['boot']).catch(console.error);
    }

    async post(req: Request, res: Response) {
        //console.log("body %o", req.body)
        const q = 'INSERT INTO timeline (build, username, host, type, audio, incognito, url, title) values ($1, $2, $3, $4, $5, $6, $7, $8) returning id;';
        const params = [req.body.build, req.body.user, req.body.host, req.body.type, req.body.audio, req.body.incognito, req.body.url, req.body.title];
        return db.query(q, params).then(r => r.rows[0].id);
    }

    async test(req: Request, res: Response) {
        return 'test ok'
    }

    async update(req: Request, res: Response) {
        console.log("update for %s", req.params.id)
        await db.query("UPDATE timeline set closed_at = current_timestamp where id = $1", [req.params.id])

    }

}