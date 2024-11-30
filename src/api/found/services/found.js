'use strict';

/**
 * found service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::found.found');
