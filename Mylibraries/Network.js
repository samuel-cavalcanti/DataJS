var Network = {
   
   nodes: [],
   
    distance: function ( sample, initPos, finalPos){
      sum = 0; 
    for ( i = initPos; i <= finalPos && i < sample.length ; i++ ) {
        sum += (information[i] - sample[i])*(information[i] - sample[i]); 
    }
    return sqrt(sum);
    },
    
    
};