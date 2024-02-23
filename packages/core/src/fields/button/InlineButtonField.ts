import { type IPlugin } from 'packages/core/src/IPlugin';
import { type ButtonConfig, ButtonStyleType } from 'packages/core/src/config/ButtonConfig';
import { ButtonField } from 'packages/core/src/fields/button/ButtonField';
import { ButtonParser } from 'packages/core/src/parsers/ButtonParser';
import { DomHelpers } from 'packages/core/src/utils/Utils';
import ButtonComponent from 'packages/core/src/utils/components/ButtonComponent.svelte';

export class InlineButtonField {
	plugin: IPlugin;
	content: string;
	filePath: string;
	cleanupCallbacks: (() => void)[] = [];

	constructor(plugin: IPlugin, content: string, filePath: string) {
		this.plugin = plugin;
		this.content = content;
		this.filePath = filePath;
		this.cleanupCallbacks = [];
	}

	private renderInitialButton(element: HTMLElement, buttonId: string): ButtonComponent {
		return new ButtonComponent({
			target: element,
			props: {
				variant: ButtonStyleType.DEFAULT,
				label: 'Button ID not Found',
				tooltip: `No button with id '${buttonId}' found`,
				error: true,
				onClick: async (): Promise<void> => {},
			},
		});
	}

	public mount(targetEl: HTMLElement): void {
		DomHelpers.empty(targetEl);
		DomHelpers.addClass(targetEl, 'mb-button-group');

		const buttonIds: string[] = ButtonParser.parseString(this.content);

		for (const buttonId of buttonIds) {
			const wrapperEl = DomHelpers.createElement(targetEl, 'span', { class: 'mb-button mb-button-inline' });

			const initialButton: ButtonComponent | undefined = this.renderInitialButton(wrapperEl, buttonId);
			let button: ButtonField | undefined;

			const loadListenerCleanup = this.plugin.api.buttonManager.registerButtonLoadListener(
				this.filePath,
				buttonId,
				(buttonConfig: ButtonConfig) => {
					initialButton?.$destroy();
					button = new ButtonField(this.plugin, buttonConfig, this.filePath, true, false);
					button.mount(wrapperEl);
				},
			);

			this.cleanupCallbacks.push(() => {
				initialButton?.$destroy();
				button?.unmount();
				loadListenerCleanup();
			});
		}
	}

	public unmount(): void {
		for (const cleanupCallback of this.cleanupCallbacks) {
			cleanupCallback();
		}
	}
}