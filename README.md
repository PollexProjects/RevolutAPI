Revolut Business Module
--- 
[![Build Status](http://jenkins.pollexprojects.nl/buildStatus/icon?job=RevolutAPI/master)](http://jenkins.pollexprojects.nl/job/RevolutAPI/job/master/)  
*A Node.JS module by Pollex*

[Revolut](https://www.revolut.com/) introduced it's
[V1.0 API](https://revolutdev.github.io/business-api) late last year for
the business users. This allows users to read payments, transactions, counter-parties
and perform similar actions as well.

### What?
This module provides an interface to the Revolut Business API, which can be used
in a Node.JS application or even a client-side browser.

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

### Wiki
This ReadMe contains the basics, head over to the [Github Wiki](https://github.com/PollexProjects/RevolutAPI/wiki) for more information!

### Usage
Let's get you up and running quickly. Starting with the most important part of this library, the RevolutBroker. The broker handles the main communication between the API and this library. This is also where you put your API key and optionally enable debug/sandbox mode.

**Identified vs Resolved**  
A.K.A. why doesn't my entity have information. Ideally every entity is synchronised with the API, this however is not the case. Instead, every time you need an entity you can *resolve* it with `.get()`, which returns a promise containing the entity with it's latest information from the API.

Instead of returning a promise every time you want to reference an entity, you get an identified entity. This means the entity only contains the entity' *id* and not it's properties. If you need it's properties, you will need to resolve it with `.get()`.

#### Examples!
**The broker**  
Let's start with creating the broker, the most important piece:
```js
    const { RevolutBroker } = require('@pollex/revolut');
    // Optional extra boolean parameter indicating sandbox mode.
    const broker = new RevolutBroker('YOU API KEY HERE');
```

Every entity needs a broker, however the broker is automagically passed to related entities. So you won't have to use it constantly!

**Retrieving accounts**  
So I would like to know my business accounts:
```js
    const { Account } = require('@pollex/revolut');

    // broker defined as previous example
    // GetAll returns a promise!
    Account.GetAll(broker)
        .then( accounts => {
            // accounts is an Array of Account objects :)
        });
```

**Paying to a CounterParty**  
Paying requires you to have an Account to pay from and a CounterAccount, which is the account of the counterparty to pay to. However a CounterAccount can't be resolved directly. Instead you have to resolve a CounterParty and get the account from the `.accounts` property.

```js
    // Assuming you have an Account and CounterAccount entity
    const payment = Account.pay(counterAccount, 12.50, 'Optional reference text');
    // A payment is not executed on creation
    payment.execute()
        .then(transaction => {
            // Executing a payment will result in an identified transaction
        });
```

**For more information like transfering money and retrieving counterparties and -accounts, see the [wiki on github](https://github.com/PollexProjects/RevolutAPI/wiki)!**

# License
This library is licensed under AGPL-3.0
