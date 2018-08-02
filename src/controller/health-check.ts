'use strict';

export const liveness = (req: any, res: any, next: any) => {
    res.send('OK');
};

export const readiness = (req: any, res: any, next: any) => {
    res.send('OK');
};
