local isOpen = false
local doOpen = false
local doClose = true
local active = false
local JournalOuvert = false

AddEventHandler('onResourceStop', function(resource)
    if resource == GetCurrentResourceName() then
        FreezeEntityPosition(PlayerPedId(), false)
		CloseUI()
    end
end)

RegisterNetEvent('emotion_book:open')
AddEventHandler('emotion_book:open', function()
	OpenUI()
end)

function OpenUI()
    local playerPed = PlayerPedId()
    isOpen = true
    SetNuiFocus(isOpen,isOpen)
    SendNUIMessage({
    type = "OpenBookGui",
    value = true,
    })
	SetCurrentPedWeapon(playerPed, GetHashKey('WEAPON_UNARMED'), true) -- unarm player
	JournalOuvert = true
	SortirJournal()
	Wait(2000)
end

function CloseUI()
    local playerPed = PlayerPedId()
    isOpen = false
    SetNuiFocus(isOpen,isOpen)
    active = false
    FreezeEntityPosition(PlayerPedId(), false)
    SendNUIMessage({
    type = "OpenBookGui",
    value = false,
    })
	JournalOuvert = false
    RangerJournal()
    ClearPedSecondaryTask(GetPlayerPed(PlayerId()))
    DetachEntity(prop,false,true)
    ClearPedTasks(player)
    DeleteObject(prop)	
end

Citizen.CreateThread(function(...)
    while true do
        Citizen.Wait(0)
        if doOpen then
            doOpen = false
            OpenUI()
        elseif doClose then
            doClose = false
            CloseUI()
        end
    end
end)

function SortirJournal()
    local ped = PlayerPedId()
    Citizen.InvokeNative(0x524B54361229154F, PlayerPedId(), GetHashKey("world_human_write_notebook"), 9999999999,true,false, false, false)
end

function RangerJournal()
    local ped = PlayerPedId()
	ExecuteCommand("annullere")
end

function AnimationJ(ped, dict, name)
    if not DoesAnimDictExist(dict) then
      return
    end
    RequestAnimDict(dict)
    while not HasAnimDictLoaded(dict) do
    Citizen.Wait(0)
    end
    TaskPlayAnim(ped, dict, name, -1.0, -0.5, 2000, 1, 0, true, 0, false, 0, false)
    RemoveAnimDict(dict)
end

RegisterNUICallback('close', CloseUI)