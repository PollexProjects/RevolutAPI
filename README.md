Revolut Business API
---
*A Node.JS module by Pollex*

[Revolut](https://www.revolut.com/) introduced it's
[V1.0 API](https://revolutdev.github.io/business-api) late last year for
the business users. This allows users to read payments, transactions, counter-parties
and perform similar actions as well.

### What?
This module provides an interface to the Revolut Business API, which can be used
in a Node.JS application or even a client-side browser.

### Why?
Pollex' project [RevIO](https://github.com/PollexProjects/RevIO) provides a link
between the free accounting software [Manager.IO](https://manager.io/) and your
Revolut Business account.
However for this project this interface was a requirement, therefore it was decided
that this interface will be developed as a separate module, as I am sure that
there are more amazing projects with Revolut Business waiting to be developed.

### Installing
This module is available in the NPM repository, just execute the below command
to install it!

```sh
    $ npm i @pollex/revolut
```
or
```sh
    $ yarn add @pollex/revolut
```


### Using
*(TODO: This section needs more work)*  
This module works with entities. Every resource is a subclass of [RevolutEntity](src/entities/RevolutEntity.js). Then there is a [RevolutBroker](src/RevolutBroker.js), this broker provides the communication from the entities to the actual Revolut API. The broker also holds your API key.

#### The broker
The broker provides communication from your entities to the API. To setup this broker all you need is your API key.

```js
    const { RevolutBroker } = require('@pollex/revolut');
    const broker = new RevolutBroker('your-key-here');
```

The broker constructor also support an optional boolean *debug*. With debug mode all your interaction will be through the Revolut API **sandbox**. Make sure to use this while testing!

```js
    new RevolutBroker('your-key-here', true);
```

#### Entities
Every entity is extended from the [RevolutEntity](src/entities/RevolutEntity.js) class. This class provides the base for all entities.  
Don't worry you probably don't have to use this class directly, instead you'll be using one of the already implemented entities:

 - [Account](src/entities/Account.js)
 - [CounterParty](src/entities/CounterParty.js)
 - [Transaction](src/entities/Transaction.js)

If you had a peek in the `src/entities/` folder, you'll notice that there are more entities. These entities are not supposed to be interacted with directly.

##### Entity fetching example
Because all entities extend from the RevolutEntity, they are easy and similar in usage. Let's retrieve all our accounts.

```js
    // Import the RevolutBroker and the Account entity
    const { RevolutBroker, Account } = require('@pollex/revolut');

    // Instantiate the RevolutBroker with our API Key
    // and we want to use the sandbox API.
    const broker = new RevolutBroker(process.env.API_KEY, true);

    // Retrieve all accounts
    Account.GetAll(broker)
        .then(accounts => {
            console.log(accounts)
        });
```

**note:** The library uses the *async* and *await* keywords.

##### Transfering
Transfering, in Revolut API terms, means sending money from one of your accounts to another with the restriction that both accounts have the same currency. So no exchanging!

```js
    // Create to identified entities
    const officeAccountIdentified = Account.get('ID-Here', broker);
    const prAccountIdentified = Account.get('ID-Here', broker);

    // Resolve both entities
    Promise.all([
        officeAccountIdentified.get(),
        prAccountIdentified.get()
    ])
        .then(([officeAccount, prAccount]) => {
            // transfer 50$ from office to pr account
            const transfer =
                officeAccount.transfer(prAccount, 50, 'Reference #100011');
            // Execute returns an identified Transaction entity
            const transaction = transfer.execute();
        });
```

## License
This project is licensed under [AGPL-V3.0](LICENSE).
