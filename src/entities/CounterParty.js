import RevolutEntity from './RevolutEntity';
import CounterAccount from './CounterAccount';

/*
 If profileType is personal or individual then this is an internal CounterParty
 */
export default class CounterParty extends RevolutEntity {

    static GetResourcePath(id) {
        return id? `/counterparty/${id}`:'/counterparties';
    }

    update(data) {
        if (!super.update(data)) return;
        this.profileType = data.profile_type;
        this.name = data.name;
        this.phone = data.phone;
        this.country = data.country;
        this.state = data.state;

        this.updateAccounts(data.accounts);
    }

    updateAccounts(accountsData) {
        this.accounts = accountsData.map(
            accountData => new CounterAccount({
                broker: this.broker,
                data: accountData,
                counterParty: this
            })
        );
    }

}
