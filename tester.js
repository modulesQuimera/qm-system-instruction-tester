module.exports = function(RED) {

	function testerNode(config) {
		RED.nodes.createNode(this,config);
      
        
		var node = this;
		
		node.on('input', function(msg) {
			var globalContext = node.context().global;
            var file = globalContext.get("exportFile");

            var command = {
                action: "tester",
                payload: {
                    attributes: [],
                    callbacks: [],
                    slots: [],
                    leds: []
                }
            };
            
            

            for(callback in config.callbacks){
                command.payload.callbacks.push(config.callbacks[callback]);
            }

            for(slot in config.slots){
                command.payload.slots.push(config.slots[slot]);
            }
            
            for(led in config.leds){
                command.payload.leds.push(config.leds[led]);
            }

            file.instructions.push(command);
            
			globalContext.set("exportFile", file);
			console.log(command);
			node.send(msg);
		});
	}
	RED.nodes.registerType("tester", testerNode);
}