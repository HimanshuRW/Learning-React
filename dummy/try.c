#include <stdio.h>
#include <stdlib.h>

int main(){
    FILE *ptr = fopen("dummy.txt","r");
    char str[100];
    while (fgets(str,50,ptr)!=NULL)
    {
        printf("str : %s\n",str);
        printf("\n");
    }
    
    return 0;
}