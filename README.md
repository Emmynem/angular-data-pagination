# angular-data-pagination
Few lines of code to help you achieve pagination in angular 7, 8, 9 ... 13 using data from server and an example of how the server code should look like.

# Usage implementation

After downloading the file, or cloning the project you can do the following
1. Copy and paste the `data-pagination-service.ts` file into your `src/app` folder of your project.
2. Create a new service using angular cli using `ng generate service data-pagination` or `ng generate service <your_personalized_name>`, open the `data-pagination-service.ts` file here in the directory, select all and copy, select all in your local file and paste.

Next steps;

## 1. Your html should be like this 
I used bootstrap4 to style the pagination elements
```
<nav aria-label="" class="mt-3 text-center">
    <ul class="pagination pagination-lg justify-content-center">
        <li class="page-item"><a class="page-link" title="First Page" style="cursor: pointer;"
                (click)="firstPage()"><i class="fas fa-angle-left"></i> First </a></li>
        <li class="page-item" [hidden]="dataPagination.hidePrev()"><a class="page-link" title="Previous Page" style="cursor: pointer;" 
                (click)="PrevPage()"><i class="fas fa-angle-left"></i> &#8592; </a></li>
        <li class="page-item active"><a class="page-link" title="Current Page">{{dataPagination.getCurrentPage()}}</a></li>
        <li class="page-item"><a class="page-link">...</a></li>
        <li class="page-item"><a class="page-link" title="Total Number Of Pages">{{dataPagination.getPages()}}</a></li>
        <li class="page-item" [hidden]="dataPagination.hideNext()"><a class="page-link" title="Next Page" style="cursor: pointer;" 
                (click)="nextPage()"><i class="fas fa-angle-right"></i> &#8594; </a></li>
        <li class="page-item"><a class="page-link" title="Last Page" style="cursor: pointer;" (click)="lastPage()"><i
                    class="fas fa-angle-left"></i> Last </a></li>
    </ul>
</nav>
```

## 2. In the component binded to the above html page, do the following

Import the service 
```
import { DataPaginationService } from '../data-pagination.service';
```

Initialize it in your constructor, must be public so the functions can be accessible in your html component
```
constructor(public dataPagination : DataPaginationService){
}
```

Set your number limit for the amount of data you want to see via rows inside your ngOnInit function
```
ngOnInit(){
  // You can as well call the function that fetches your data here, mine was
  this.queryProfiles();
  this.dataPagination.setNumberLimit(20);
}
```

This is what the function that fetches my data from the server looks like.
```
queryProfiles() {
    this.dataService.sendGetRequest(this.dataPagination.getStartingPoint(), this.dataPagination.getNumberLimit(), this.profilesPath)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
        // Do your conditions on whether the request was successful or not
        // In your success condition do this.
        this.dataPagination.setTotalCount(data.totalCount);
        this.dataPagination.setPages(Math.ceil(this.dataPagination.getTotalCount() / this.dataPagination.getNumberLimit()));
        
        // Where data.totalCount comes from the response of your request

      })
}
```

See [Data service](https://github.com/Emmynem/demo-angular-contact-app/blob/master/src/app/data.service.ts) to understand how the second line of code above works

After all that our last work will be to create a somewhat instance of our functions from the `data-pagination-service.ts` file in order to bind them to the html above
```
firstPage() {
    if (this.dataPagination.firstPage()) {
        this.queryProfiles(); // this will be your personalized function that you use to fetch your data like I did above
    }
}
lastPage() {
    if (this.dataPagination.lastPage()) {
        this.queryProfiles(); // this will be your personalized function that you use to fetch your data like I did above
    }
}

nextPage() {
    this.dataPagination.nextPage();
    this.queryProfiles(); // this will be your personalized function that you use to fetch your data like I did above
}
PrevPage() {
    this.dataPagination.PrevPage();
    this.queryProfiles(); // this will be your personalized function that you use to fetch your data like I did above
}
```

Also checkout the server side script that gets all the [profiles](https://github.com/Emmynem/demo-angular-contact-app/blob/master/src/app/backend/api/get_profile.php) for reference on how to write and execute your query

That's it, you are good to go. Good luck.



