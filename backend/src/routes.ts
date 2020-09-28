import { Router } from 'express';


const _routes = Router();

_routes.get('/', (_, res) => res.json("Register is working..."));

export const routes = _routes;
