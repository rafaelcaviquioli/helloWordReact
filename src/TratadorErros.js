import PubSub from 'pubsub-js';

export default class TratadorErros {
    tratarErros(erros){
        PubSub.publish('erros-validacao', erros.errors);
    }
}