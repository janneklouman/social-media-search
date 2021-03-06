import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import {
    Response,
    Jsonp
} from '@angular/http';

import {
    Block
} from '../../block';

import {
    
    SearchCriteria,
    BlockProvider,
    API_INSTAGRAM

} from '../shared';


/**
 * Instagram api service
 */
@Injectable()    
export class InstagramService implements BlockProvider {
    
    private getEndpoint = API_INSTAGRAM.getEndpoint;
    private accessToken = API_INSTAGRAM.accessToken;

    constructor ( private jsonp : Jsonp ) {
        
    }

    public search( searchCriteria : SearchCriteria ) {

        let tag = searchCriteria.tag;
        let url = this.getEndpoint.replace('{TAG}', tag);
        url = url.replace('{ACCESS_TOKEN}', this.accessToken);
        url = url + '&callback=callbackFunction';

        this.jsonp.get(url)
            .toPromise()
            .then(this.toBlock)
            .catch(this.handleError);
        
        let block: Block = {
            'id': '1',
            'username': 'username',
            'time': 1000,
            'link': 'http://www.example.com',
            'API': API_INSTAGRAM,
            'title': 'testing',
            'text': 'text',
            'iconUrl': 'iconUrl',
            'hidden' : false,
            'media': 'test'};

        return [
            block, block
        ];
    }

    public toBlock(response : Response) {
        console.log(response);
    }

    public handleError(response : Response) {
        console.error(response);
    }

    getBlocks( searchCriteria: SearchCriteria ) : Promise<Block[]> {
        return Promise.resolve ( this.search( searchCriteria ) );
    }

}
