/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from 'vs/platform/instantiation/common/instantiation';
import { Event } from 'vs/base/common/event';

export interface IRecentDirectoriesManager {
	readonly _serviceBrand: undefined;
	readonly STORAGE_SIZE: number;
	recentDirectories: Set<string>;

	onOpenedDirectory: Event<{ openedDir: string, replacedDir: string | undefined }>;
}

export const IRecentDirectoriesManager = createDecorator<IRecentDirectoriesManager>('recentDirectoriesManager');
