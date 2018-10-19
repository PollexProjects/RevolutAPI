import RevolutEntity from './RevolutEntity';

export default class CounterAccount extends RevolutEntity {

    static GetResourcePath() {
        throw new Error('You should retrieve CounterAccounts through CounterParty entity');
    }

}
