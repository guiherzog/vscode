/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IBreadcrumbObserver } from 'vs/workbench/browser/parts/editor/breadcrumbObserver';
import { IFileStat, FileKind } from 'vs/platform/files/common/files';
import { IExplorerService } from 'vs/workbench/contrib/files/common/files';
import { IResourceLabel } from 'vs/workbench/browser/labels';
import { URI } from 'vs/base/common/uri';
import 'vs/css!./media/scopeTreeFileIcon';
import { WorkbenchDataTree, WorkbenchAsyncDataTree } from 'vs/platform/list/browser/listService';
import { FuzzyScore } from 'vs/base/common/filters';

export class BreadcrumbObserver implements IBreadcrumbObserver {
	declare readonly _serviceBrand: undefined;

	constructor(
		@IExplorerService private readonly explorerService: IExplorerService
	) { }

	registerTreeListeners(tree: WorkbenchDataTree<any, any, FuzzyScore> | WorkbenchAsyncDataTree<any, any, FuzzyScore>): void {
		tree.onMouseOver(e => {
			const element = e.element;
			if (element) {
				const icon = document.getElementById('breadcrumbFocusIconContainer_' + (element as IFileStat).resource.toString());
				if (icon) {
					icon.style.visibility = 'visible';
					icon.onclick = () => {
						let resource = (element as IFileStat).resource;
						this.explorerService.setRoot(resource);
					};
				}
			}
		});

		tree.onMouseOut(e => {
			const element = e.element;
			if (element) {
				const icon = document.getElementById('breadcrumbFocusIconContainer_' + (element as IFileStat).resource.toString());
				if (icon) {
					icon.style.visibility = 'hidden';
				}
			}
		});
	}

	renderFocusIcon(resource: URI, fileKind: FileKind, templateData: IResourceLabel): void {
		templateData.element.style.float = '';

		const iconContainer = document.createElement('img');
		iconContainer.className = 'scope-tree-focus-icon';
		iconContainer.id = 'breadcrumbFocusIconContainer_' + resource.toString();

		const previousIcon = templateData.element.lastChild;
		if (previousIcon && (<HTMLElement>previousIcon).className === 'scope-tree-focus-icon') {
			templateData.element.removeChild(previousIcon);
		}

		if (fileKind !== FileKind.FILE) {
			templateData.element.style.float = 'left';
			templateData.element.appendChild(iconContainer);
		}
	}
}
