import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Common, Select } from '../../models';

@Component({
    selector: 'app-select-field',
    templateUrl: './select.component.html'
})
export class SelectComponent implements OnChanges {

    @Input() options: any[];
    @Input() notAllowedItemIds: number[];
    @Input() placeholder: string;

    @Output() changeSelection = new EventEmitter<Select.IOption<unknown>>();

    isOpen = false;

    get selected(): string {
        if (this.options && this.options.length) {
            const target = this.options.find(option => option.isSelect);
            return target ? target.title : this.placeholder;
        } else {
            return this.placeholder;
        }
    }

    ngOnChanges(sc: Common.EcoLineSimpleChanges<this>) {
        const { options } = sc;
        if (options && options.currentValue) {
            this.options = this.options.map(option => Object.assign({}, option));
        }
    }

    canSelect(target: Select.IOption<unknown>): boolean {
        return this.options.find(option => option.id === target.id).isSelect
            || (this.notAllowedItemIds && this.notAllowedItemIds.indexOf(target.id) > - 1);
    }

    selectOption(target: Select.IOption<unknown>): void {
        this.options = this.options.map(option => {
            option.isSelect = option.id === target.id;
            return option;
        });
        this.isOpen = !this.isOpen;
        this.changeSelection.emit(target);
    }
}
