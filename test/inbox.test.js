const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());




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