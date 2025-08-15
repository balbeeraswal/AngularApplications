import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class funcsServices {
    age: number;
   
  constructor() {}

  sortDistrictsAlphabatically(JSONarray:JSON[])
  {
    // console.log(JSONarray);
    JSONarray.sort((a:any, b:any) => {
            const aValue = JSON.
                stringify(Object.values(a.district_Name.substring(0,1)).sort());
            const bValue = JSON.
                stringify(Object.values(b.district_Name.substring(0,1)).sort());
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        });
     
    return JSONarray
  }

  sortTehsilsAlphabatically(JSONarray:JSON[])
  {
    JSONarray.sort((a:any, b:any) => {
            const aValue = JSON.
                stringify(Object.values(a.tehsil_Name.substring(0,1)).sort());
            const bValue = JSON.
                stringify(Object.values(b.tehsil_Name.substring(0,1)).sort());
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        });
     
    return JSONarray
  }

  sortBlocksAlphabatically(JSONarray:JSON[])
  {
    JSONarray.sort((a:any, b:any) => {
            const aValue = JSON.
                stringify(Object.values(a.block_Name.substring(0,1)).sort());
            const bValue = JSON.
                stringify(Object.values(b.block_Name.substring(0,1)).sort());
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        });
     
    return JSONarray
  }

  sortPanchayatsAlphabatically(JSONarray:JSON[])
  {
    JSONarray.sort((a:any, b:any) => {
            const aValue = JSON.
                stringify(Object.values(a.panchayat_Name.substring(0,1)).sort());
            const bValue = JSON.
                stringify(Object.values(b.panchayat_Name.substring(0,1)).sort());
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        });
    return JSONarray
  }

  sortVillagesAlphabatically(JSONarray:JSON[])
  {
    JSONarray.sort((a:any, b:any) => {
            const aValue = JSON.
                stringify(Object.values(a.village_Name.substring(0,1)).sort());
            const bValue = JSON.
                stringify(Object.values(b.village_Name.substring(0,1)).sort());
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        });
    return JSONarray
  }

  sortTownsAlphabatically(JSONarray:JSON[])
  {
    JSONarray.sort((a:any, b:any) => {
            const aValue = JSON.
                stringify(Object.values(a.town_Name.substring(0,1)).sort());
            const bValue = JSON.
                stringify(Object.values(b.town_Name.substring(0,1)).sort());
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        });
    return JSONarray
  }

  sortWardsAlphabatically(JSONarray:JSON[])
  {
    JSONarray.sort((a:any, b:any) => {
            const aValue = JSON.
                stringify(Object.values(a.ward_Name.substring(0,1)).sort());
            const bValue = JSON.
                stringify(Object.values(b.ward_Name.substring(0,1)).sort());
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        });
    return JSONarray
  }

  sortBankBranchesAlphabatically(JSONarray:JSON[])
  {
    JSONarray.sort((a:any, b:any) => {
            const aValue = JSON.
                stringify(Object.values(a.branch_Name.substring(0,1)).sort());
            const bValue = JSON.
                stringify(Object.values(b.branch_Name.substring(0,1)).sort());
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        });
    return JSONarray
  }

    sortDisabilityTypesAlphabatically(JSONarray:JSON[])
  {
    JSONarray.sort((a:any, b:any) => {
            const aValue = JSON.
                stringify(Object.values(a.disability_name.substring(0,1)).sort());
            const bValue = JSON.
                stringify(Object.values(b.disability_name.substring(0,1)).sort());
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        });
    return JSONarray
  }

      sortLoksabhaAreasAlphabatically(JSONarray:JSON[])
  {
    JSONarray.sort((a:any, b:any) => {
            const aValue = JSON.
                stringify(Object.values(a.lokSabha_Name.substring(0,1)).sort());
            const bValue = JSON.
                stringify(Object.values(b.lokSabha_Name.substring(0,1)).sort());
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        });
    return JSONarray
  }

        sortAssemblyConstAlphabatically(JSONarray:JSON[])
  {
    JSONarray.sort((a:any, b:any) => {
            const aValue = JSON.
                stringify(Object.values(a.assembConst_Name.substring(0,1)).sort());
            const bValue = JSON.
                stringify(Object.values(b.assembConst_Name.substring(0,1)).sort());
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        });
    return JSONarray
  }



  public CalculateAge(DateOfBrith:Date|null): number
     {
        let dateOfBirth
        dateOfBirth=DateOfBrith;
         if(dateOfBirth){
            var timeDiff = Math.abs(Date.now() - dateOfBirth);
            //Used Math.floor instead of Math.ceil
            //so 26 years and 140 days would be considered as 26, not 27.
            this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
        }
        return this.age;
    }


sortNumbers(array: Array<number>) {
    return array.sort((a, b) => a - b)
  }
}
