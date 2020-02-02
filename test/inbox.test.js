const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());


let accounts;
beforeEach (async () => {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();


        //promise 를 가져와서 다음 코드 실행
        //await web3.eth.getAccounts().then(fetchedAccounts => {
        //})
    //Use one of those accounts to deploy
    //the contract
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(accounts);
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