VorpInv = exports.vorp_inventory:vorp_inventoryApi()

-------------------------------------------------------------------------
-------------------------------   Item    -------------------------------
-------------------------------------------------------------------------

VorpInv.RegisterUsableItem("book", function(data)
	if Config.SubItem then
		VorpInv.subItem(data.source, "book", 1)
	end
		TriggerClientEvent('emotion_book:open', data.source)
end)

-------------------------------------------------------------------------
-------------------------------   End    --------------------------------
-------------------------------------------------------------------------

print("^6𝙀𝙈𝙊𝙏𝙄𝙊𝙉_𝘽𝙊𝙊𝙆 ^5is Started! ^6🌌 𝙀𝙢𝙤𝙩𝙞𝙤𝙣 𝙎𝙘𝙧𝙞𝙥𝙩𝙨 ^0- ^5https://discord.gg/h4nhwVQCAQ ^0")
