const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach (async () => {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();

        //promise 를 가져와서 다음 코드 실행
        //await web3.eth.getAccounts().then(fetchedAccounts => {
        //})

    //Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    // Hi there 은 constructor function 의 argument 로 전달됨. constructor function 은 
    // array 로 받을 수 있음
        .deploy({
            data: bytecode, 
            arguments:['Hi there!']
        })
        .send({from: accounts[0], gas:'1000000'})

    
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    })
    it('has a default message', async () => {
        //methods 는 contract 안에 있는 public functions 를 포함하는 object. 그 중에 message()를 호출
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    })

    it('can change the message', async () => {
        //send a transaction
        // 'await' 동시에 일어나는 것이 아니므로 기다리겠다.
        // tx 를 보내지만 결과 값을 어떤 변수에도 할당하지 않겠다.tx hash 값만 반환되면
        // tx 가 성공한 것으로 간주
        await inbox.methods.setMessage('bye').send({from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    })
})


/*
class Car{
    park(){
        return 'stopped';
    }
    drive(){
        return 'vroom';
    }
}

let car; //it 안에서도 사용 가능하게, car 의 값을 뒤에서 바꿀 수 있다. 

//it 전에 실행
beforeEach(() => {
    car = new Car(); //const car = new Car(); it 안에서 사용할 수 없음
});

//Car 대신 내가 하고싶은 이름 => organizing 하기 위함
describe('Car', () => {
    it('can park', ()=> {
        assert.equal(car.park(), 'stopped')
    });

    it('can drive', ()=> {
        assert.equal(car.drive(),'vroom')
    });

});
*/