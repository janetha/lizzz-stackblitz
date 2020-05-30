import {RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle} from '@angular/router';

export class RouteReuseStrategyService implements RouteReuseStrategy {

  private handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // decides if the route should be stored
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return false;
    }
    let shouldReuse = false;
    // console.log('checking if this route should be reused or not', route);
    if (route.routeConfig.data) {
      route.routeConfig.data.reuse ? shouldReuse = true : shouldReuse = false;
    }
    // console.log('stored and reuse ' + (<any>route.component).name + ' for later? ' + shouldReuse);
    return shouldReuse;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // return true if there is a stored route object for the current route
    return !!this.handlers[this.getUrl(route)];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    // determine if a route should be reused
    // if it return true routing will not happen

    // if (future.component) {
    //   console.log('reuse future=' + (<any>future.component).name);
    // }
    // if (current.component) {
    //   console.log('reuse current=' + (<any>current.component).name);
    // }

    if (future.routeConfig === current.routeConfig) {
      // don't route
      return true;
    }
    if (future.routeConfig) {
      if (future.routeConfig.data && future.routeConfig.data.reuse) {
        // route it
        // console.log('we should reuse ' + (<any>future.component).name);
        return false;
      }
    }
    return (future.routeConfig === current.routeConfig);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return null;
    }
    // console.log('retrieve handler');
    return this.handlers[this.getUrl(route)];
  }

  store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle): void {
    // console.log('storing handler');
    if (handler) {
      this.handlers[this.getUrl(route)] = handler;
    }
  }

  getUrl(route: ActivatedRouteSnapshot): string {
    let path = '';
    if (route.routeConfig != null && route.routeConfig.path != null) {
      path = route.routeConfig.path;
    }
    return path;
  }
}

