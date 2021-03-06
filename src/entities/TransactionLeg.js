import RevolutEntity from './RevolutEntity';
import Account from './Account';
import CounterParty from './CounterParty';
import CounterAccount from './CounterAccount';

export default class TransactionLeg extends RevolutEntity {

    static GetResourcePath() {
        throw new Error('You should retrieve TransactionLegs through Transaction entity');
    }

    static GetIdPropertyName() {
        return 'leg_id';
    }

    update(data) {
        if (!super.update(data)) return;
        this.amount = data.amount;
        this.currency = data.currency;
        this.description = data.description;

        this.account = new Account({
            broker: this.broker,
            id: data.account_id
        });
        if (data.counterparty) {
            this.updateCounterParty(data);
        }
    }

    updateCounterParty(data) {
        this.counterParty = new CounterParty({
            broker: this.broker,
            id: data.counterparty.id
        });

        // FIXME:BUG: CounterAccounts are not retrievable independently
        // needs a counterParty, but above counterParty is a pending promise
        this.counterAccount = new CounterAccount({
            broker: this.broker,
            id: data.counterparty.account_id
        });

        // TEMP: Has counterAccount resolve async
        // BUG: Therefore it takes some time before it's resolved
        this.counterParty.get().then(party => {
            this.counterAccount = party.accounts.filter(
                account => account.id == data.counterparty.account_id
            )[0];
        });
    }

}
