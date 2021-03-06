import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Tweet, User } from '../../../shared';
import { SearchService } from '../../service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { filter, finalize, map } from 'rxjs/operators';

@Component({
    selector: 'app-search-result-list',
    templateUrl: './search-result-list.component.html',
    styleUrls: ['./search-result-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultListComponent implements OnInit {

    keyword: string;

    userList: User[] = [];
    tweetList: Tweet[] = [];

    constructor(private route: ActivatedRoute,
                private searchService: SearchService,
                private message: NzMessageService,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            filter(params => params.has('keyword')),
            map(params => params.get('keyword'))
        ).subscribe(keyword => {
            this.keyword = keyword;
            this.cd.markForCheck();
            this.searchByKeyword(this.keyword);
        });
    }

    searchByKeyword(keyword: string) {
        this.searchService.searchByKeyword(keyword)
            .pipe(finalize(() => {
                this.cd.markForCheck();
            }))
            .subscribe(next => {
                this.userList = next.users;
                this.tweetList = next.tweets;
            }, error => {
                this.message.error(error.error.message || '搜索失败');
            });
    }

}
