
import { DeadCellsApp } from './routes/app';

export const app: DeadCellsApp = document.querySelector('dc-app');

// Use require here to avoid hoisting. `app` needs to be defined before this all runs
require('./routes');
