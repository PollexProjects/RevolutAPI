import RevolutEntity from './RevolutEntity';

export default class Transaction extends RevolutEntity {

    static GetResourcePath() {
        return '/transactions';
    }

}
