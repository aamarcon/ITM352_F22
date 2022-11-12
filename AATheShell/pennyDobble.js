day1 = 1
day2 = 2
day3 = 4 
day4 = 8
day5 = 16
day6 = 32
day7 = 64 
day8 = 128
day9 = 256
day10 = 512
day11 = 1024
day12 = 2048
day13 = 4096
day14 = 8192
day15 = 16384
day16 = 32768
day17 = 65536
day18 = 131072
day19 = 262144
day20 = 524288
day21 = 1048576
day22 = 2097152
day23 = 4194304
day24 = 8388608
day25 = 16777216
day26 = 33554432
day27 = 67108864
day28 = 134217728
day29 = 268435456
day30 = 536870912
day31 = 1073741824
total = 0;
day = [1];
tomorrow = [1,];
doublepennies = [];
dayone=0;
nextday = 1;
amount = 0;
for(i = 1 ; i < 31; i++){
    
    dayone = nextday; // after this line today has a numberone as index 0
    doublepennies.push(dayone);
    
    nextday = doublepennies[i-1]*2;

    amount += doublepennies[i-1];
    if(doublepennies[i-1] <= 100){
    console.log(`On day ${i} you have ${doublepennies[i-1]} pennies`);
    console.log(`If you add with yesterday today you have ${amount}`);
    }else{

        newNexday = nextday / 100
       
        amount += doublepennies[i-1];
        
        console.log(`On day ${i} you have ${newNexday} dollars`);
    console.log(`If you add with yesterday today you have ${amount/100} dollars`);

    }

    
}
