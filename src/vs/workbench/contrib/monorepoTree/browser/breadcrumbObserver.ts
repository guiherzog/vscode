/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import 'vs/css!./media/monorepoTreeFileIcon';
import { IBreadcrumbObserver } from 'vs/workbench/browser/parts/editor/breadcrumbObserver';
import { IFileStat, FileKind } from 'vs/platform/files/common/files';
import { IExplorerService } from 'vs/workbench/contrib/files/common/files';
import { IResourceLabel } from 'vs/workbench/browser/labels';
import { URI } from 'vs/base/common/uri';
import { Tree } from 'vs/workbench/browser/parts/editor/breadcrumbsPicker';

export class BreadcrumbObserver implements IBreadcrumbObserver {
	declare readonly _serviceBrand: undefined;

	constructor(
		@IExplorerService private readonly explorerService: IExplorerService
	) { }

	registerTreeListeners(tree: Tree<any, any>): void {
		tree.onMouseOver(e => {
			const element = e.element as IFileStat;
			const icon = element && document.getElementById('breadcrumbFocusIconContainer_' + element.resource.toString());
			if (icon) {
				icon.style.visibility = 'visible';
				icon.onclick = () => {
					this.explorerService.setRoot(element.resource);
				};
			}
		});

		tree.onMouseOut(e => {
			const element = e.element as IFileStat;
			const icon = element && document.getElementById('breadcrumbFocusIconContainer_' + element.resource.toString());
			if (icon) {
				icon.style.visibility = 'hidden';
			}
		});
	}

	renderFocusIcon(resource: URI, fileKind: FileKind, { element }: IResourceLabel): void {
		element.style.float = '';
		const alignedIconClassName = 'monorepo-tree-focus-icon-breadcrumb-aligned';
		const iconContainer = document.createElement('img');
		iconContainer.className = alignedIconClassName;
		iconContainer.id = 'breadcrumbFocusIconContainer_' + resource.toString();

		const previousIcon = element.lastChild;
		if (previousIcon && (<HTMLElement>previousIcon).className === alignedIconClassName) {
			element.removeChild(previousIcon);
		}

		if (fileKind !== FileKind.FILE) {
			element.style.float = 'left';
			element.appendChild(iconContainer);
		}
	}
}
