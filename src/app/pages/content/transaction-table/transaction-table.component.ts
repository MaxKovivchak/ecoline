import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Content } from '../../../shared/models';

@Component({
    selector: 'app-transaction-table',
    templateUrl: './transaction-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionTableComponent {

    @Input() transactions: Content.ITransaction[];

    @Output() loadNextPage = new EventEmitter<void>();

    readonly transactionType = Content.ETransactionType;

    onLoadNextPage(): void {
        this.loadNextPage.emit();
    }

}
