VorpInv = exports.vorp_inventory:vorp_inventoryApi()

VorpInv.RegisterUsableItem("book", function(data)
	if Config.SubItem then
		VorpInv.subItem(data.source, "book", 1)
	end
		TriggerClientEvent('emotion_book:open', data.source)
end)
