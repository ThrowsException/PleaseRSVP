from aiohttp import web
from aiohttp_security import (
    remember,
    forget,
    authorized_userid,
    check_permission,
    check_authorized,
)

from please_rsvp.db_auth import check_credentials, get_user
from please_rsvp.views import events, invites, members, teams


async def status(request):
    return web.Response(text="Healthy")


async def login(request):
    response = web.HTTPFound("/teams")
    body = await request.json()
    login = body.get("username")
    password = body.get("password")
    if await check_credentials(request.app["db_pool"], login, password):
        user = await get_user(request.app["db_pool"], login)
        print(user)
        id = str(user[0])
        print(id)
        await remember(request, response, id)
        print("GOT")
        raise response

    raise web.HTTPUnauthorized(body=b"Invalid username/password combination")


def setup_routes(app):
    app.router.add_get("/status", status)
    app.router.add_get("/api/status", status)

    app.router.add_view("/api/teams", teams.TeamView)
    app.router.add_view("/api/teams/{id}", teams.TeamView)
    app.router.add_view("/api/teams/{id}/events", events.TeamEvents)
    app.router.add_view("/api/teams/{id}/members", members.TeamMembers)

    app.router.add_view("/api/events", events.EventView)
    app.router.add_view("/api/events/{id}", events.EventView)

    app.router.add_view("/api/members", members.MemberView)
    app.router.add_view("/api/members/{id}", members.MemberView)

    app.router.add_view("/api/invites", invites.InviteView)
    app.router.add_view("/api/invites/{id}", invites.InviteView)

    app.router.add_route("POST", "/api/login", login)
