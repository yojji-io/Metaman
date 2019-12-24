import { Feature } from './common/classes';

import AuthFeature from './auth';
import CoreFeature from './core';
import CommonFeature from './common';

export default new Feature(AuthFeature, CommonFeature, CoreFeature);
