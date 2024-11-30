'use strict';

/**
 * lost service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lost.lost');
