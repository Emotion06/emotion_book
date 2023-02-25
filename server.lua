VORP = exports.vorp_inventory:vorp_inventoryApi()

VORP.RegisterUsableItem("book", function(data)
		--VORP.subItem(data.source, "book", 1)
		TriggerClientEvent('emotion_book:open', data.source)
end)
