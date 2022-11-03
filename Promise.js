class myPromise{
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';

    constructor(func){
        this.PromiseState = myPromise.PENDING;
        this.PromiseResult = null;
        try{
        func(this.resolve.bind(this), this.reject.bind(this))
        } catch(error){
            this.reject(error)
        }
    }
    resolve(result){
        if(this.PromiseState === myPromise.PENDING){
            this.PromiseState = myPromise.FULFILLED
            this.PromiseResult = result
        }
    }
    reject(reason){
        if(this.PromiseState === myPromise.PENDING){
            this.PromiseState = myPromise.REJECTED
            this.PromiseResult = reason
        }
    }
    then(onFulfilled, onRejected){
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason;
        };
        if(this.PromiseState === myPromise.FULFILLED){
            setTimeout(()=>{
                onFulfilled(this.PromiseResult)
            })
        }
        if(this.PromiseState === myPromise.REJECTED){
            setTimeout(()=>{
                onRejected(this.PromiseResult)
            })
        }
    }
}

// 测试代码
console.log(1);
let promise1 = new myPromise((resolve, reject) => {
    console.log(2);
    resolve('这次一定');
})
promise1.then(
    result => {
        console.log('fulfilled:', result);
    },
    reason => {
        console.log('rejected:', reason)
    }
)
console.log(3);


