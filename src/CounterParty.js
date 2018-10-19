import RevolutEntity from './RevolutEntity';
import CounterAccount from './CounterAccount';

export default class CounterParty extends RevolutEntity {

    static GetResourcePath(id) {
        return id? `/counterparty/${id}`:'/counterparties';
    }

    update(data) {
        super.update(data);
        this.name = data.name;
        this.state = data.state;

        this.updateAccounts(data.accounts);
    }

    updateAccounts(accountsData) {
        this.accounts = accountsData.map(
            accountData => new CounterAccount(accountData, this.broker)
        );
    }

}
