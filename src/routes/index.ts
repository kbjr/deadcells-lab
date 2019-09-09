
import { app } from '../app';

require('./app');
require('./home');
require('./routes');
require('./items');
require('./builds');

app.registerRoute('home', { component: 'dc-page-home', subHeading: '' });
app.registerRoute('routes', { component: 'dc-page-routes', subHeading: 'Routes' });
app.registerRoute('items', { component: 'dc-page-items', subHeading: 'Items' });
app.registerRoute('builds', { component: 'dc-page-builds', subHeading: 'Builds' });
