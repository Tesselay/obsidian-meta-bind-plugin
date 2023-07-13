import { AbstractInputField } from '../AbstractInputField';
import { TextComponent } from 'obsidian';
import { MBExtendedLiteral, numberToString } from '../../utils/Utils';
import { ErrorLevel, MetaBindInternalError } from '../../utils/errors/MetaBindErrors';

type T = number;

export class NumberInputField extends AbstractInputField<T> {
	numberComponent: TextComponent | undefined;

	getValue(): T | undefined {
		if (!this.numberComponent) {
			return undefined;
		}

		return parseFloat(this.numberComponent.getValue());
	}

	filterValue(value: MBExtendedLiteral | undefined): T {
		if (typeof value === 'number') {
			return value;
		} else if (typeof value === 'string') {
			return Number.parseFloat(value);
		} else {
			return this.getDefaultValue();
		}
	}

	updateDisplayValue(value: T): void {
		this.numberComponent?.setValue(value.toString());
	}

	isEqualValue(value: T | undefined): boolean {
		return this.getValue() == value;
	}

	getDefaultValue(): T {
		return 0;
	}

	getHtmlElement(): HTMLElement {
		if (!this.numberComponent) {
			throw new MetaBindInternalError(ErrorLevel.WARNING, 'failed to get html element for input field', "container is undefined, field hasn't been rendered yet");
		}

		return this.numberComponent.inputEl;
	}

	render(container: HTMLDivElement): void {
		console.debug(`meta-bind | NumberInputField >> render ${this.renderChild.uuid}`);

		const component = new TextComponent(container);
		component.inputEl.type = 'number';
		component.setValue(numberToString(this.getInitialValue()));
		component.onChange(value => {
			const n = parseFloat(value);
			this.onValueChange(isNaN(n) ? 0 : n);
		});
		this.numberComponent = component;
	}

	public destroy(): void {}
}
