/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable max-len */

import assert from 'assert';
import { h1NoCache } from '@adobe/fetch';
import { config } from 'dotenv';

config();

/**
 * @param {string} path
 * @param {RequestInit} [init]
 * @returns {{url: URL} & RequestInit}
 */
function getFetchOptions(path, init = {}) {
  return {
    url: new URL(`https://vcc-pdp-renderer-ci.adobeaem.workers.dev${path}`),
    cache: 'no-store',
    redirect: 'manual',
    ...init,
    headers: {
      ...(init.headers ?? {}),
    },
  };
}

describe('Post-Deploy Tests', () => {
  const fetchContext = h1NoCache();

  after(async () => {
    await fetchContext.reset();
  });

  it('valid pdp renders html', async () => {
    const { url, ...opts } = getFetchOptions('/visualcomfort/adobe-edge/content/product/us/p/camille-sconce-sk2016');
    const res = await fetch(url, opts);

    assert.strictEqual(res.status, 200);
  });
});
